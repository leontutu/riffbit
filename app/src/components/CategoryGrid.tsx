import { Dispatch, SetStateAction } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import { Category } from "@shared/constants/constants";

import CategoryGridItem from "./CategoryGridItem";

/**
 * Renders a responsive grid of category buttons.
 *
 * Each category is displayed using `CategoryGridItem` with a color and
 * toggle state. The component accepts an external `toggles` record and a
 * `setToggles` setter to update selection state from a parent component.
 */

const CATEGORY_LIST = Object.values(Category);

const CATEGORY_COLORS: Record<Category, string> = {
    [Category.PHILOSOPHY]: "#FA8072", // Salmon
    [Category.ROMANCE]: "#F48FB1", // Rose
    [Category.DILEMMA]: "#FFB74D", // Apricot
    [Category.FANTASY]: "#4DB6AC", // Soft Teal
    [Category.REFLECTION]: "#64B5F6", // Sky Blue
    [Category.MEMORIES]: "#9575CD", // Muted Purple
    [Category.FUN]: "#FFD54F", // Maize
    [Category.SECRETS]: "#BA68C8", // Orchid
};

type Props = {
    layoutStyle?: ViewStyle;
    toggles: Record<Category, boolean>;
    setToggles: Dispatch<SetStateAction<Record<Category, boolean>>>;
};

export default function CategoryGrid({ layoutStyle, toggles, setToggles }: Props) {
    const handleToggle = (btnKey: keyof typeof toggles) => {
        setToggles(prev => ({
            ...prev,
            [btnKey]: !prev[btnKey],
        }));
    };

    return (
        <View style={[layoutStyle, styles.gridContainer]}>
            {CATEGORY_LIST.map(category => (
                <View key={category} style={styles.gridItem}>
                    <CategoryGridItem
                        name={category}
                        color={CATEGORY_COLORS[category]}
                        toggled={toggles[category]}
                        setToggled={() => handleToggle(category)}
                    />
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    gridContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignContent: "center",
        justifyContent: "center",
        width: "88%",
        alignSelf: "center",
    },
    gridItem: {
        width: "50%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 0,
        borderColor: "#ccc",
    },
});
