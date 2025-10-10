'use client';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { State } from 'country-state-city';

const StateSelect = ({ selectedCountry, selectedState, setSelectedState, setFormData }) => {
  const states = selectedCountry ? State.getStatesOfCountry(selectedCountry.isoCode) : [];

  return (
    <div>
      <Label htmlFor="state" className="block text-sm font-medium text-gray-700">
        State/Province
      </Label>
      <Select
        onValueChange={(isoCode) => {
          const state = states.find(s => s.isoCode === isoCode);
          setSelectedState(state);
          setFormData(prev => ({
            ...prev,
            state: state.name,
            city: ""
          }));
        }}
        value={selectedState?.isoCode || ""}
        disabled={!selectedCountry}
      >
        <SelectTrigger className="mt-1 w-full">
          <SelectValue placeholder="Select a state/province" />
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          {states.map((state) => (
            <SelectItem key={state.isoCode} value={state.isoCode}>
              {state.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default StateSelect;