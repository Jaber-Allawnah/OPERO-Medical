import FormInput from '@/components/ui/FormInput';

export default function PatientFields({ control, errors }: any) {
  return (
    <>
      <FormInput control={control} name="weight" label="Weight" keyboardType="numeric" error={errors.weight?.message} />
      <FormInput control={control} name="bloodGroup" label="Blood Group" error={errors.bloodGroup?.message} />
      <FormInput control={control} name="height" label="Height" keyboardType="numeric" error={errors.height?.message} />
    </>
  );
}
