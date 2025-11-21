import { Pressable, StyleSheet, View, ViewStyle } from "react-native";

import Feather from "@expo/vector-icons/Feather";

/**
 * Interactive button for advancing to the next question.
 * Provides visual feedback with a scale animation on press.
 */

type Props = {
    onPress: () => void;
    layoutStyle: ViewStyle;
    size: number;
    iconName: React.ComponentProps<typeof Feather>["name"];
};

export default function CircleIconButton({ layoutStyle, onPress, size, iconName }: Props) {
    return (
        <View style={layoutStyle}>
            <Pressable
                onPress={onPress}
                style={({ pressed }) => [
                    {
                        padding: 10,
                        transform: [{ scale: pressed ? 0.9 : 1.0 }],
                    },
                    styles.button,
                ]}
            >
                <Feather name={iconName} size={size} color="black" />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        borderWidth: 6,
        borderRadius: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
});
