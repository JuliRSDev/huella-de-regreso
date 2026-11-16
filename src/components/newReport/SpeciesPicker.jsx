import { SPECIES } from '../../constants/pets'

// Choosing from fixed options avoids the spelling variants free text produces ("perrita", "canino"...).
const SpeciesPicker = ({ value, onChange }) => (
  <fieldset>
    <legend className="block text-sm font-semibold text-gray-700 mb-1">
      Tipo de mascota<span className="text-red-400 ml-0.5" aria-hidden="true">*</span>
    </legend>
    <div className="flex rounded-xl border border-gray-200 overflow-hidden" role="radiogroup">
      {SPECIES.map((s) => (
        <button
          key={s.value}
          type="button"
          role="radio"
          aria-checked={value === s.value}
          onClick={() => onChange(s.value)}
          className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
            value === s.value
              ? 'bg-[#FFD54F] text-gray-900'
              : 'bg-white text-gray-500 hover:bg-gray-50'
          }`}
        >
          <span aria-hidden="true">{s.emoji}</span> {s.label}
        </button>
      ))}
    </div>
  </fieldset>
)

export default SpeciesPicker
