import React from 'react';

export const renderField = ({ input, label, type, placeholder, rows, autofocus, disabled, meta: { touched, error } }) => {
  const className = `form-group ${touched && error ? 'has-error' : ''}`;
  const rCClassName = `form-check ${touched && error ? 'has-error' : ''}`;

  if (type === 'textarea') {
    return (
      <div className={className}>
        <label>{label}</label>
        <textarea {...input} rows={rows} autoFocus={autofocus} disabled={disabled} className='form-control' />
        {touched && error ? <span className='text-danger'>{error}</span> : ''}
      </div>
    );
  } else if (type === 'radio' || type === 'checkbox') {
    return (
      <div className={rCClassName}>
        <label className='form-check-label control-label'><input {...input} type={type} autoFocus={autofocus} disabled={disabled} className='form-check-input' />{label}</label>
        {touched && error ? <span className='text-danger'>{error}</span> : ''}
      </div>
    );
  } else {
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} type={type} placeholder={placeholder} autoFocus={autofocus} disabled={disabled} className='form-control' />
        {touched && error ? <span className='text-danger'>{error}</span> : ''}
      </div>
    );
  }
};

export const renderSelect = ({ input, label, disabled, meta: { touched, error }, children }) => {
  const className = `form-group ${touched && error ? 'has-error' : ''}`;

  return (
    <div className={className}>
      <label>{label}</label>
      <select {...input} disabled={disabled} className='form-control'>
        {children}
      </select>
      {touched && error ? <span className='text-danger'>{error}</span> : ''}
    </div>
  );
};
