export default interface Hospital {
    hospital : {
        id: string,
        name: string,
        city: string,
        type: string,
        rating: string,
        last_updated: string,
        opening_time: string,
        closing_time: string,
        geolocation: string,
        address: string,
    },
    hospitalInfo : {
        id: string,
        hospital_id: string,
        address: string,
        city_name: string,
        state_name: string,
        geolocation: string
    },
    amenities : {
        id: string,
        hospital_id: string,
        x_ray: boolean,
        mri: boolean,
        ecg: boolean,
        ultra_sound: boolean,
        blood_test: boolean
    },
    bloodBank : {
        id: string,
        hospital_id: string,
        o_negative: number,
        ab_negative: number,
        a_negative: number,
        b_negative: number,
        o_positive: number,
        ab_positive: number,
        a_positive: number,
        b_positive: number
    },
    availability: {
        bed: number,
        total_bed: number,
        icu: number,
        total_icu: number,
        ccu: number,
        total_ccu: number
        ventilator: number,
        total_ventilator: number,
        oxygen_cylinders: number,
        total_oxygen_cylinders: number
        created_at: string
    }
}

// Refered hospital response
// {
//     "amenities": {
//         "id": "65cb3b0c80820f0ab2f19a9e",
//         "hospital_id": "LB118822",
//         "x_ray": true,
//         "mri": true,
//         "ecg": true,
//         "ultra_sound": false,
//         "blood_test": false
//     },
//     "hospitalInfo": {
//         "id": "65cb8eacedb6a70ccf4e1852",
//         "hospital_id": "LB118822",
//         "address": "5th Avenue, Bidhannagar, Durgapur",
//         "city_name": "Durgapur",
//         "state_name": "West Bengal",
//         "geolocation": "23.5200737,87.3533125"
//     },
//     "bloodBank": {
//         "id": "65cb3b0c80820f0ab2f19a9f",
//         "hospital_id": "LB118822",
//         "o_negative": 0,
//         "ab_negative": 0,
//         "a_negative": 0,
//         "b_positive": 0,
//         "o_positive": 0,
//         "b_negative": 0,
//         "ab_positive": 0,
//         "a_positive": 0,
//         "other": 0
//     },
//     "availability": {
//         "id": "65cb3b0b80820f0ab2f19a9d",
//         "hospital_id": "LB118822",
//         "bed": 10,
//         "total_bed": 100,
//         "icu": 0,
//         "total_icu": 0,
//         "ccu": 0,
//         "total_ccu": 0,
//         "ventilator": 0,
//         "total_ventilator": 0,
//         "oxygen_cylinders": 0,
//         "total_oxygen_cylinders": 0
//     },
//     "hospital": {
//         "id": "LB118822",
//         "name": "Mission Hospital, Durgapur",
//         "city": "Paschim Bardhaman",
//         "geolocation": "23.5200737,87.3533125",
//         "type": "Private",
//         "last_updated": "02:20:07 20-05-2022",
//         "opening_time": " ",
//         "closing_time": " "
//     }
// }