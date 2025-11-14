import { Pressable } from "react-native";

import Feather from "@expo/vector-icons/Feather";

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
            <Feather name={"arrow-right-circle"} size={85} color="black" />
        </Pressable>
    );
}

// const styles = StyleSheet.create({
//     container: {
//         borderRadius: 50,
//         borderWidth: 5,
//         overflow: "hidden",
//     },
// });
