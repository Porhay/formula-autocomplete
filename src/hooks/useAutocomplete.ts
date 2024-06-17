import axios from 'axios';
import { useQuery } from 'react-query';
import { autocompleteUrl } from '../constants';

export interface Suggestion {
  name: string;
  category: string;
  value: number | string;
  id: string;
}

const fetchSuggestions = async (query: string): Promise<Suggestion[]> => {
    try {
      const { data } = await axios.get<Suggestion[]>(`${autocompleteUrl}?name=${query}`);
      return data;
    } catch (error) {
      return []; // means that no data found
    }
};

export const useAutocomplete = (query: string) => {
  return useQuery(['autocomplete', query], () => fetchSuggestions(query), {
    enabled: !!query, // automatic refetching
  });
};
