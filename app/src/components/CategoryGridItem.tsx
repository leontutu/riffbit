import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";

/**
 * Tappable label used inside the category grid.
 *
 * Displays the category name on a colored pill and reflects a `toggled`
 * state through opacity.
 */
type Props = {
    layoutStyle?: ViewStyle;
    name: string;
    color: string;
    toggled: boolean;
    setToggled: (value: boolean) => void;
};

export default function c0mp03nT({ name, color, toggled, setToggled }: Props) {
    const onPress = () => {
        setToggled(!toggled);
    };

    return (
        <Pressable onPress={onPress}>
            <View
                style={[
                    styles.textLabel,
                    {
                        backgroundColor: color,
                        opacity: toggled ? 1 : 0.3,
                    },
                ]}
            >
                <Text style={styles.textContent}>{name}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    textLabel: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 20,
        minWidth: 120,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 5,
    },
    textContent: {
        fontSize: 15,
        fontWeight: "400",
        color: "#1A1A1A",
        textAlign: "center",
        textTransform: "capitalize",
        letterSpacing: 0.5,
    },
});
