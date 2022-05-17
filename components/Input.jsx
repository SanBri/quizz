const Input = ({
  label,
  name,
  options,
  placeholder,
  onChange,
  id,
  value,
  maxLength,
  min,
  max,
  step,
  list,
  className = "input",
  type = "text",
  required = true,
}) => {
  let input;

  if (type === "select") {
    input = (
      <select name={name} placeholder={placeholder} required={required}>
        <option selected disabled>
          Choisir dans la liste...
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  } else if (type === "textarea") {
    input = (
      <textarea
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
      />
    );
  } else if (type === "submit" || type === "button") {
    input = (
      <input type={type} required={false} className='button' value={value} />
    );
  } else {
    input = (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        id={id}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        min={min}
        max={max}
        step={step}
        list={list}
      />
    );
  }

  return (
    <div className={className}>
      {label && (
        <label htmlFor={name}>
          {label} {required && <span style={{ color: "red" }}>*</span>}
        </label>
      )}
      {input}
    </div>
  );
};

export default Input;
