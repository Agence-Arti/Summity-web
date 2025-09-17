import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import FranceFlag from '@/components/icons/FranceFlag';
import UKFlag from '@/components/icons/UKFlag';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language;
  const CurrentFlag = currentLanguage.startsWith('fr') ? FranceFlag : UKFlag;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-foreground rounded-full h-8 w-8">
          <CurrentFlag className="w-5 h-5 rounded-full object-cover" />
          <span className="sr-only">Changer de langue</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background border-border">
        <DropdownMenuItem 
          onClick={() => changeLanguage('fr')} 
          disabled={currentLanguage.startsWith('fr')}
          className="cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <FranceFlag className="w-5 h-auto rounded-sm" />
            <span>Français</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => changeLanguage('en')} 
          disabled={currentLanguage.startsWith('en')}
          className="cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <UKFlag className="w-5 h-auto rounded-sm" />
            <span>English</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;