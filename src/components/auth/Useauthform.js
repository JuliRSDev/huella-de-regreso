import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

/**
 * useAuthForm
 * Hook compartido para Login y Signup.
 * Expone handlers para email/password y Google.
 */
export function useAuthForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const from     = location.state?.from || '/'

  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)

  /* ─── Helpers ─── */
  const clearError = () => setError(null)

  const getFirebase = () =>
    Promise.all([
      import('firebase/auth'),
      import('firebase/firestore'),
      import('../../config/firebase'),
    ])

  /* ─── Login con email/password ─── */
  const loginWithEmail = async ({ email, password }) => {
    if (!email)    return setError('Ingresa tu correo')
    if (!password) return setError('Ingresa tu contraseña')

    setError(null)
    setLoading(true)
    try {
      const [{ signInWithEmailAndPassword }, , { auth }] = await getFirebase()
      await signInWithEmailAndPassword(auth, email, password)
      navigate(from, { replace: true })
    } catch (err) {
      // With email enumeration protection on, Firebase answers invalid-credential for both
      // an unknown email and a wrong password, so the message cannot claim which one failed.
      if (['auth/invalid-credential', 'auth/user-not-found', 'auth/wrong-password'].includes(err.code)) {
        setError('Correo o contraseña incorrectos. Revisa los datos o crea una cuenta.')
        return
      }
      if (err.code === 'auth/invalid-email') {
        setError('El correo no es válido')
        return
      }
      if (err.code === 'auth/too-many-requests') {
        setError('Demasiados intentos fallidos. Espera unos minutos e inténtalo de nuevo.')
        return
      }
      console.error('Email login failed', err.code)
      setError('No se pudo iniciar sesión. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  /* ─── Signup con email/password ─── */
  const signupWithEmail = async ({ email, password, firstName, lastName }) => {
    if (!firstName?.trim()) return setError('Ingresa tu nombre')
    if (!email)             return setError('Ingresa un correo válido')
    if (!password)          return setError('Ingresa una contraseña')
    if (password.length < 6) return setError('La contraseña debe tener al menos 6 caracteres')

    setError(null)
    setLoading(true)
    try {
      const [
        { createUserWithEmailAndPassword, updateProfile },
        { doc, setDoc },
        { auth, db },
      ] = await getFirebase()

      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(user, { displayName: `${firstName} ${lastName}`.trim() })
      await setDoc(doc(db, 'users', user.uid), {
        firstName, lastName, email,
        photoURL: null, uid: user.uid,
        createdAt: new Date(),
      })
      navigate('/')
    } catch (err) {
      if (err.code === 'auth/email-already-in-use')
        return setError('Este correo ya está registrado. Inicia sesión')
      if (err.code === 'auth/invalid-email')
        return setError('El correo no es válido')
      setError(err.message || 'Error creando la cuenta')
    } finally {
      setLoading(false)
    }
  }

  /* ─── Google (login + signup) ─── */
  const authWithGoogle = async () => {
    setError(null)
    setLoading(true)
    try {
      const [
        { signInWithPopup },
        { doc, setDoc },
        { auth, googleProvider, db },
      ] = await getFirebase()

      const { user } = await signInWithPopup(auth, googleProvider)
      const nameParts = user.displayName?.split(' ') || ['Usuario']

      await setDoc(
        doc(db, 'users', user.uid),
        {
          firstName: nameParts[0],
          lastName:  nameParts.slice(1).join(' ') || '',
          email:     user.email,
          photoURL:  user.photoURL || null,
          uid:       user.uid,
          createdAt: new Date(),
        },
        { merge: true }
      )
      navigate(from, { replace: true })
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user')
        setError(err.message || 'Error al iniciar sesión con Google')
    } finally {
      setLoading(false)
    }
  }

  return { loading, error, clearError, loginWithEmail, signupWithEmail, authWithGoogle }
}