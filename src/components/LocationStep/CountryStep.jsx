'use client';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Country } from 'country-state-city';

const CountrySelect = ({ selectedCountry, setSelectedCountry, setSelectedState, setFormData }) => {
  return (
    <div>
      <Label htmlFor="country" className="block text-sm font-medium text-gray-700">
        Country
      </Label>
      <Select
        onValueChange={(isoCode) => {
          const country = Country.getAllCountries().find(c => c.isoCode === isoCode);
          setSelectedCountry(country);
          setSelectedState(null); // reset state
          setFormData(prev => ({
            ...prev,
            country: country.name,
            state: "",
            city: ""
          }));
        }}
        value={selectedCountry?.isoCode || ""}
      >
        <SelectTrigger className="mt-1 w-full">
          <SelectValue placeholder="Select a country" />
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          {Country.getAllCountries()
            .filter(country => country.isoCode === 'US' || country.isoCode === 'CA')
            .map((country) => (
              <SelectItem key={country.isoCode} value={country.isoCode}>
                {country.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CountrySelect;