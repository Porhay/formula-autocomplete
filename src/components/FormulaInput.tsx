import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { useStore } from '../hooks/useFormulaState';
import { useAutocomplete, Suggestion } from '../hooks/useAutocomplete';
import '../styles/FormulaInput.scss';
import { operands } from '../constants';

const FormulaInput: React.FC = () => {
  const { formula, setFormula, addTag, removeTag } = useStore();
  const [inputValue, setInputValue] = useState('');
  const { data: suggestions = [] } = useAutocomplete(inputValue);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleAddTag = (tag: any) => {
    addTag(tag);
    setTimeout(() => setInputValue(''), 0); // hotfix
  };

  const handleRemoveTag = (index: number) => {
    removeTag(index);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue) {
      handleAddTag({name: inputValue});
    } else if (operands.includes(e.key)) {
      handleAddTag({name: e.key, valueType: 'operand'});
    } else if (
      e.key === 'Backspace' &&
      inputValue === '' &&
      formula.length > 0
    ) {
      handleRemoveTag(formula.length - 1);
    }
    console.log(formula);
    
  };

  const handleEditTag = (index: number, value: string) => {
    const newFormula = [...formula];
    newFormula[index].name = value;
    setFormula(newFormula);
  };

  return (
    <div className="formula-input-container">
      <div className="formula-tags-container">
        {formula.map((tag, index) =>
          operands.includes(tag.name) || tag.name === '' ? (
            <span key={index} className="operand-tag">
              <input
                type="text"
                value={tag.name}
                onChange={(e) => handleEditTag(index, e.target.value)}
                className="tag-input"
              />
            </span>
          ) : (
            <span key={index} className="tag">
              <input
                type="text"
                value={tag.name}
                onChange={(e) => handleEditTag(index, e.target.value)}
                className="tag-input"
              />
              <button
                className="remove-tag"
                onClick={() => handleRemoveTag(index)}
              >
                [x]
              </button>
            </span>
          ),
        )}
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
              <div className="suggestion-item">
                <span className="suggestion-name">{suggestion.name}</span>
                <span className="suggestion-category">
                  {suggestion.category}
                </span>
                <span className="suggestion-value">
                  {typeof suggestion.value === 'number'
                    ? suggestion.value
                    : suggestion.value}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FormulaInput;
