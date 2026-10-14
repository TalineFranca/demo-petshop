"use client";

import { MotionConfig } from "framer-motion";
import { createContext, useContext, useMemo, useState } from "react";
import { speciesProfiles, type Species, type SpeciesProfile } from "@/data/pets";

type PetContextValue = {
  pet: Species;
  setPet: (pet: Species) => void;
  profile: SpeciesProfile;
};

const PetContext = createContext<PetContextValue | null>(null);

export function PetProvider({ children }: { children: React.ReactNode }) {
  const [pet, setPet] = useState<Species>("dog");
  const value = useMemo(() => ({ pet, setPet, profile: speciesProfiles[pet] }), [pet]);

  return (
    <PetContext.Provider value={value}>
      {/* reducedMotion="user": o Framer Motion respeita prefers-reduced-motion sozinho */}
      <MotionConfig reducedMotion="user">
        {/* data-pet troca a cor de destaque do site inteiro (ver globals.css) */}
        <div data-pet={pet}>{children}</div>
      </MotionConfig>
    </PetContext.Provider>
  );
}

export function usePet() {
  const ctx = useContext(PetContext);
  if (!ctx) throw new Error("usePet precisa estar dentro de <PetProvider>");
  return ctx;
}
