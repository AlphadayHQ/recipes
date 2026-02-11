import { useCallback, useLayoutEffect, useRef, useState } from 'react';

function SingleOTPInput({
  focus,
  autoFocus,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { focus?: boolean }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const prevFocusRef = useRef(false);

  useLayoutEffect(() => {
    if (inputRef.current && focus && autoFocus) {
      inputRef.current.focus();
      if (focus !== prevFocusRef.current) {
        inputRef.current.select();
      }
    }
    prevFocusRef.current = !!focus;
  }, [autoFocus, focus]);

  return (
    <input
      ref={inputRef}
      className="w-10 h-12 rounded text-center font-semibold text-background bg-primary/20 focus:bg-primary/30 placeholder-shown:bg-primary/10 placeholder:text-transparent focus:outline-none border-none"
      placeholder="·"
      {...rest}
    />
  );
}

interface OTPInputProps {
  length: number;
  onChangeOTP: (otp: string) => void;
  autoFocus?: boolean;
  disabled?: boolean;
}

export function OTPInput({
  length,
  onChangeOTP,
  autoFocus,
  disabled,
}: OTPInputProps) {
  const [activeInput, setActiveInput] = useState(0);
  const [otpValues, setOTPValues] = useState(Array<string>(length).fill(''));

  const handleOtpChange = useCallback(
    (otp: string[]) => {
      const otpValue = otp.join('');
      if (otpValue.length === length) {
        onChangeOTP(otpValue);
      }
    },
    [length, onChangeOTP]
  );

  const changeCodeAtFocus = useCallback(
    (str: string) => {
      const updated = [...otpValues];
      updated[activeInput] = str[0] || '';
      setOTPValues(updated);
      handleOtpChange(updated);
    },
    [activeInput, handleOtpChange, otpValues]
  );

  const focusInput = useCallback(
    (index: number) => {
      setActiveInput(Math.max(Math.min(length - 1, index), 0));
    },
    [length]
  );

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.currentTarget.value;
      if (!val) {
        e.preventDefault();
        return;
      }
      changeCodeAtFocus(val);
      focusInput(activeInput + 1);
    },
    [activeInput, changeCodeAtFocus, focusInput]
  );

  const handleOnKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case 'Backspace':
        case 'Delete':
          e.preventDefault();
          if (otpValues[activeInput]) {
            changeCodeAtFocus('');
          } else {
            focusInput(activeInput - 1);
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          focusInput(activeInput - 1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          focusInput(activeInput + 1);
          break;
        default:
          if (e.key.match(/^[^a-zA-Z0-9]$/)) {
            e.preventDefault();
          }
          break;
      }
    },
    [activeInput, changeCodeAtFocus, focusInput, otpValues]
  );

  const handleOnPaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedData = e.clipboardData
        .getData('text/plain')
        .trim()
        .slice(0, length - activeInput)
        .split('');
      if (pastedData.length) {
        let nextFocusIndex = 0;
        const updated = [...otpValues];
        updated.forEach((val, index) => {
          if (index >= activeInput) {
            const changedValue = pastedData.shift() || val;
            if (changedValue) {
              updated[index] = changedValue;
              nextFocusIndex = index;
            }
          }
        });
        setOTPValues(updated);
        setActiveInput(Math.min(nextFocusIndex + 1, length - 1));
        if (updated.every((v) => v !== '')) {
          handleOtpChange(updated);
        }
      }
    },
    [activeInput, handleOtpChange, length, otpValues]
  );

  return (
    <div className="flex w-full justify-between max-w-xs">
      {Array(length)
        .fill('')
        .map((_, index) => (
          <SingleOTPInput
            key={index}
            type="text"
            focus={activeInput === index}
            value={otpValues[index]}
            autoFocus={autoFocus}
            onFocus={() => focusInput(index)}
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}
            onBlur={() => setActiveInput(-1)}
            onPaste={handleOnPaste}
            disabled={disabled}
            maxLength={1}
          />
        ))}
    </div>
  );
}
