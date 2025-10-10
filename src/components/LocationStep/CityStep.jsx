'use client';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { City } from 'country-state-city';

const CitySelect = ({ selectedCountry, selectedState, formData, setFormData }) => {
  const cities = selectedState && selectedCountry
    ? City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode)
    : [];

  return (
    <div>
      <Label htmlFor="city" className="block text-sm font-medium text-gray-700">
        City
      </Label>
      <Select
        onValueChange={(cityName) => {
          setFormData(prev => ({
            ...prev,
            city: cityName
          }));
        }}
        value={formData.city}
        disabled={!selectedState}
      >
        <SelectTrigger className="mt-1 w-full">
          <SelectValue placeholder="Select a city" />
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          {cities.map((city) => (
            <SelectItem key={city.name} value={city.name}>
              {city.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CitySelect;