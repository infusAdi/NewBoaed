import React from 'react';
import { Button, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import germany from "../components/Image/germany.png"
import english from "../components/Image/united-states.png"

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', lang: 'English', flag : english },
    { code: 'es', lang: 'German', flag : germany }, // Should this be 'Spanish'?
  ];

  const changeLang = (lng) => {
    i18n.changeLanguage(lng);
    console.log(lng);
  };

  return (
    <div>
      {languages.map((lng) => (
        <Col xxl="6" key={lng.code}>
          <Button
            href="#auth"
            variant="outline-light"
            className="w-100"
            onClick={() => changeLang(lng.code)}
          >
            <img
              src={lng.flag}
              alt=""
              className="icon"
            />
            <span className="fw-medium">{lng.lang}</span>
          </Button>
        </Col>
      ))}
    </div>
  );
};

export default LanguageSelector;
