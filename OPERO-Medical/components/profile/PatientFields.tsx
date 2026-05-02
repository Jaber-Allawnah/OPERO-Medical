import FormInput from '@/components/ui/FormInput';

export default function PatientFields({ control, errors }: any) {
  return (
    <>
      <FormInput control={control} name="weight" placeholder="Weight (kg)" keyboardType="numeric" error={errors.weight?.message} />
      <FormInput control={control} name="bloodGroup" placeholder="Blood Group (e.g. A+)" error={errors.bloodGroup?.message} />
      <FormInput control={control} name="height" placeholder="Height (cm)" keyboardType="numeric" error={errors.height?.message} />
    </>
  );
}
