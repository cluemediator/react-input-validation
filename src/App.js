import React, { useState, useCallback } from 'react';
import Input from './Input';

function App() {

  const [form, setForm] = useState({
    name: '',
    email: '',
    website: ''
  });

  const onInputValidate = (value, name) => {
    setError(prev => ({
      ...prev,
      [name]: { ...prev[name], errorMsg: value }
    }));
  }

  const [error, setError] = useState({
    name: {
      isReq: true,
      errorMsg: '',
      onValidateFunc: onInputValidate
    },
    email: {
      isReq: true,
      reqType: 'EMAIL',
      errorMsg: '',
      onValidateFunc: onInputValidate
    },
    website: {
      reqType: 'URL',
      errorMsg: '',
      onValidateFunc: onInputValidate
    }
  });

  const onInputChange = useCallback((value, name) => {
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const validateForm = () => {
    let isInvalid = false;
    Object.keys(error).forEach(x => {
      const errObj = error[x];
      if (errObj.errorMsg) {
        isInvalid = true;
      } else if (errObj.isReq && !form[x]) {
        isInvalid = true;
        onInputValidate(true, x);
      }
    });
    return !isInvalid;
  }

  const handleSubmit = () => {
    const isValid = validateForm();
    if (!isValid) {
      console.error('Invalid Form!');
      return false;
    }

    console.log('Data:', form);
  }

  return (
    <div className="app">
      <div className='mb-3'><strong>Input validation in React - <a href="https://www.cluemediator.com" target="_blank" rel="noreferrer">Clue Mediator</a></strong></div>
      <div className='form'>
        <Input
          name="name"
          title="Name"
          value={form.name}
          onChangeFunc={onInputChange}
          {...error.name}
        />
        <Input
          name="email"
          title="Email"
          value={form.email}
          onChangeFunc={onInputChange}
          {...error.email}
        />
        <Input
          name="website"
          title="Website"
          value={form.website}
          onChangeFunc={onInputChange}
          {...error.website}
        />
        <button
          className='btn btn-primary btn-sm mt-2'
          onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;