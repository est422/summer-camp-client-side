export type camperProfileType = {
  id: string;
  imageName: string;
  firstName: string;
  lastName: string;
  dateofbirth: Date;
  gender: string;

  userId: string;
  camperMedicalInfo: [
    {
      id: string;
      alergies: string;
      medicalCondition: string;
      dietaryRestriction: string;
      shouldAvoid: string;
      accommodationRequirments: string;
    }
  ];
};
