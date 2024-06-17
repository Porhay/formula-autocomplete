import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { useStore } from '../hooks/useFormulaState';
import { useAutocomplete, Suggestion } from '../hooks/useAutocomplete';
import '../styles/FormulaInput.scss';
import { operands } from '../constants';

const FormulaInput: React.FC = () => {
  const { formula, setFormula, addTag, removeTag } = useStore();
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState<number | null>(null);
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
    if (e.key === 'Enter' && inputValue === '') {
        calculateResult();
    } else if (e.key === 'Enter' && inputValue) {
      handleAddTag({ name: inputValue, value: inputValue });
    } else if (operands.includes(e.key)) {
      handleAddTag({ name: e.key, valueType: 'operand' });
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

  const calculateResult = () => {
    let calcResult = 0;
    let currentOperator = '+';
  
    formula.forEach((tag, index) => {
      if (operands.includes(tag.name)) {
        currentOperator = tag.name;
      } else if (!isNaN(Number(tag.value))) {
        switch (currentOperator) {
          case '+':
            calcResult += Number(tag.value);
            break;
          case '-':
            calcResult -= Number(tag.value);
            break;
          case '*':
            calcResult *= Number(tag.value);
            break;
          case '/':
            calcResult /= Number(tag.value);
            break;
          default:
            break;
        }
      }
    });
    setResult(calcResult);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.formula-input-container')) {
        calculateResult();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [formula]);

  return (
    <div className="formula-input-container">
        <div className="result-block">
            <strong>Result: </strong>{result !== null ? result: 0}
        </div>
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
