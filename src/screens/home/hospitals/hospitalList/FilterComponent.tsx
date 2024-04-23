import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Chip, Icon } from 'react-native-paper'
import GlobalStyles from '../../../../styles/general/global_styles'
import { err } from 'react-native-svg';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/reducers/user/userStore';
import { filterHighRated, sortByDistance, sortByName, sortByRating } from '../../../../redux/reducers/hospital/hospitalSlice';
export type Filter = {
    name: string,
    selected: boolean
}
export type Sort = {
    name: string,
    selected: boolean,
    sort: string
}

const FilterComponent = (props: { bottomSheetRef: React.RefObject<BottomSheetMethods> }) => {
    const hospitalState = useSelector((state: RootState) => state.hospital);
    const dispatch = useDispatch<AppDispatch>();
    const defaultFilters: Filter[] = [
        {
            name: 'High Ratings',
            selected: false
        },
        {
            name: 'Nearby',
            selected: false
        },
        {
            name: 'Verified',
            selected: false
        },
        {
            name: 'Government',
            selected: false
        },
    ]
    const defaultSorts: Sort[] = [
        {
            name: 'Distance',
            selected: false,
            sort: 'none'
        },
        {
            name: 'Rating',
            selected: false,
            sort: 'none'
        },
        {
            name: 'Name',
            selected: false,
            sort: 'none'
        },
    ]
    const [filters, setFilters] = useState(defaultFilters);
    const [sorts, setSorts] = useState(defaultSorts);

    const onSortChipPressed = (sort: Sort) => {
        switch (sort.sort) {
            case 'none':
                sort.sort = 'asc';
                sort.selected = true;
                break;
            case 'asc':
                sort.sort = 'desc';
                sort.selected = true;
                break;
            case 'desc':
                sort.sort = 'none';
                sort.selected = false;
                break;
        }
        // When one sort is enabled, disable the other
        sorts.forEach(s => s.name != sort.name ? s.selected = false : null);
        sort.name == 'Distance' ? dispatch(sortByDistance(sort.sort)) : sort.name == 'Rating' ? dispatch(sortByRating(sort.sort)) : dispatch(sortByName(sort.sort));
        setSorts([...sorts]);
    }

    const getCloseIcon = (sort: Sort) => {
        switch (sort.sort) {
            case 'none':
                return undefined;
            case 'asc':
                return "sort-ascending";
                break;
            case 'desc':
                return "sort-descending";
                break;
        }
        setSorts([...sorts]);
    }

    const onFilterPressed = (filter: Filter) => {
        filter.selected = !filter.selected; 
        if (filter.name == 'High Ratings') {
            filter.selected ? dispatch(filterHighRated(true)) : dispatch(filterHighRated(false));
        }
        setFilters([...filters]);
    }
    

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Filters</Text>
            <View style={styles.chipContainer}>
                {
                    filters.map((filter) => {
                        return (
                            <Chip
                                key={filter.name}
                                selectedColor={filter.selected ? GlobalStyles.white : GlobalStyles.black}
                                style={filter.selected ? styles.chipEnabled : styles.chipDisabled}
                                closeIcon={filter.selected ? "check" : undefined}
                                textStyle={{ color: filter.selected ? GlobalStyles.white : GlobalStyles.grey950 }}
                                onPress={(e) => { onFilterPressed(filter) }}
                                onClose={filter.selected ? () => { filter.selected = !filter.selected; setFilters([...filters]) } : undefined}
                            >{filter.name}</Chip>
                        )
                    })
                }
            </View>
            <Text style={[styles.heading, { marginTop: 24 }]}>Sort</Text>
            <View style={styles.chipContainer}>
                {
                    sorts.map((sort) => {
                        return (
                            <Chip
                                key={sort.name}
                                selectedColor={sort.selected ? GlobalStyles.white : GlobalStyles.black}
                                style={sort.selected ? styles.chipEnabled : styles.chipDisabled}
                                closeIcon={getCloseIcon(sort)}
                                textStyle={{ color: sort.selected ? GlobalStyles.white : GlobalStyles.grey950 }}
                                onPress={(e) => onSortChipPressed(sort)}
                                onClose={sort.selected ? () => onSortChipPressed(sort) : undefined}
                            >{sort.name}</Chip>
                        )
                    })
                }
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    heading: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: GlobalStyles.secondaryColor,
        marginBottom: 10
    },
    chipContainer: {
        flex: 0,
        flexDirection: 'row',
        flexWrap: 'wrap',
        maxWidth: 395,
        justifyContent: 'center',
    },
    chipDisabled: {
        backgroundColor: GlobalStyles.white,
        margin: 5,
        color: GlobalStyles.white,
        fontSize: 16,
        borderRadius: 50,
        borderWidth: 1,
        textAlign: 'center',
        verticalAlign: 'middle',
        borderColor: GlobalStyles.grey200
    },
    chipEnabled: {
        backgroundColor: GlobalStyles.primaryColour,
        margin: 5,
        fontSize: 16,
        borderRadius: 50,
        color: GlobalStyles.white,
        borderWidth: 1,
        textAlign: 'center',
        verticalAlign: 'middle',
        borderColor: GlobalStyles.primaryColour
    }
})

export default FilterComponent