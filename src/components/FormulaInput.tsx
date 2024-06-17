import '../styles/FormulaInput.scss';
import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { useStore } from '../hooks/useFormulaState';
import { useAutocomplete } from '../hooks/useAutocomplete';


const FormulaInput: React.FC = () => {
  const { formula, setFormula, addTag, removeTag } = useStore();
  const [inputValue, setInputValue] = useState('');
  const { data: suggestions = [] } = useAutocomplete(inputValue);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleAddTag = (tag: { name: string }) => {
    addTag(tag);
    setInputValue('');
  };

  const handleRemoveTag = (index: number) => {
    removeTag(index);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue) {
      handleAddTag({ name: inputValue });
    } else if (e.key === 'Enter' && ['+', '-', '*', '/', '^', '(', ')'].includes(e.key)) {
      handleAddTag({ name: e.key });
    }
  };

  const handleEditTag = (index: number, value: string) => {
    const newFormula = [...formula];
    newFormula[index].name = value;
    setFormula(newFormula);
  };

  return (
    <div className="formula-input-container">
      <div className="formula-tags-container">
        {formula.map((tag, index) => (
          <span key={index} className="tag">
            <input 
              type="text" 
              value={tag.name} 
              onChange={(e) => handleEditTag(index, e.target.value)} 
              className="tag-input"
            />
            <button className="remove-tag" onClick={() => handleRemoveTag(index)}>x</button>
          </span>
        ))}
        <input 
          type="text" 
          value={inputValue} 
          onChange={handleInputChange} 
          onKeyDown={handleKeyDown} 
          placeholder="Enter your formula..."
          className="formula-input"
        />
      </div>
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleAddTag(suggestion)}>
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FormulaInput;
