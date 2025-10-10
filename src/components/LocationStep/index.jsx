'use client';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CountrySelect from './CountryStep';
import StateSelect from './StateStep';
import CitySelect from './CityStep';

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
  if (step !== 4) return null;

  return (
    <div className="space-y-6">
      <CountrySelect
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        setSelectedState={setSelectedState}
        setFormData={setFormData}
      />
      
      <StateSelect
        selectedCountry={selectedCountry}
        selectedState={selectedState}
        setSelectedState={setSelectedState}
        setFormData={setFormData}
      />
      
      <CitySelect
        selectedCountry={selectedCountry}
        selectedState={selectedState}
        formData={formData}
        setFormData={setFormData}
      />

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