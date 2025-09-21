'use client';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Country, State, City } from 'country-state-city';

const LocationStep = ({
  step,
  setStep,
  selectedCountry,
  setSelectedCountry,
  selectedState,
  setSelectedState,
  formData,
  setFormData
}) => {
  // Get states based on selected country
  const states = selectedCountry ? State.getStatesOfCountry(selectedCountry.isoCode) : [];
  
  // Get cities based on selected state and country
  const cities = selectedState && selectedCountry
    ? City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode)
    : [];

  if (step !== 4) return null;

  return (
    <div className="space-y-6">
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

      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => setStep(3)}
          className="flex items-center gap-1"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </Button>
        <Button
          type="button"
          onClick={() => setStep(5)}
          className="bg-[#007D63] hover:bg-[#006a52] text-white flex items-center gap-1"
          disabled={!formData.country || !formData.city}
        >
          Next <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default LocationStep;