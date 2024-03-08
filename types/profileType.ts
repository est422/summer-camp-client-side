export type profileType = {
  id: string;
  imageName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  relationshiptocamper: string;
  addressInfo: { phone: string; address: string; city: string };
  camperInfo: [
    {
      id: string;
      imageName: string;
      firstName: string;
      lastName: string;
      dateofbirth: string;
      gender: string;
      camperMedicalInfo: [
        {
          alergies: string;
          medicalCondition: string;
          dietaryRestriction: string;
          shouldAvoid: string;
          accommodationRequirments: string;
        }
      ];
    }
  ];
  receipt: string;
  status: string;
};
