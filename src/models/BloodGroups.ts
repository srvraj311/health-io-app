interface BloodGroup {
    label: string,
    value: string
}
const bloodGroupOptions = [
    { label: 'A+', value: 'a_positive' },
    { label: 'A-', value: 'a_negative' },
    { label: 'B+', value: 'b_positive' },
    { label: 'B-', value: 'b_negative' },
    { label: 'AB+', value: 'ab_positive' },
    { label: 'AB-', value: 'ab_negative' },
    { label: 'O+', value: 'o_positive' },
    { label: 'O-', value: 'o_negative' },
    { label: 'Others', value: 'other' }
]

export default bloodGroupOptions;
