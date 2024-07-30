import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import { styled } from '@mui/material/styles'; // Correct import for MUI v5+

// Define a styled TextField component
const StyledTextField = styled(TextField)<{ variant: 'filled' | 'outlined' | 'standard' }>(({ theme }) => ({
  margin: theme.spacing(1),
  width: '100%',
}));

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <StyledTextField // Removed typeof to correctly reference the StyledTextField component
      label="Search pantry items"
      variant="outlined"
      value={query}
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
