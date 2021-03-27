import { forwardRef, useState } from 'react';
import { FieldError } from 'react-hook-form';
import { Container, InputContainer, Input } from './style';
import { Search } from 'icons';

interface SearchProps {
  placeholder: string;
  error?: FieldError;
  name: string;
  loading?: boolean;
}

export const SearchField = forwardRef<HTMLInputElement, SearchProps>(({ placeholder, name, error }, ref) => {
  const [showError, setShowError] = useState(false);

  return (
    <Container>
      <InputContainer>
        <Input
          autoCapitalize="off"
          autoComplete="off"
          hasError={error ? true : false}
          id={name}
          name={name}
          onBlur={(): void => { setShowError(false);}}
          onFocus={(): void => { setShowError(true); }}
          placeholder={placeholder}
          ref={ref}
          type="text"
        />
      </InputContainer>
    </Container>
  );
});
