import { Pressable } from "react-native";

import Feather from "@expo/vector-icons/Feather";

/**
 * Interactive button for advancing to the next question.
 * Provides visual feedback with a scale animation on press.
 */

type Props = {
    onPress: () => void;
};

export default function ArrowButton({ onPress }: Props) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                {
                    padding: 10,
                    transform: [{ scale: pressed ? 0.9 : 1.0 }],
                },
            ]}
        >
            <Feather name={"arrow-right-circle"} size={120} color="black" />
        </Pressable>
    );
}
