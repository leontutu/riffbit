import { Text, View } from "react-native";

/**
 * Displays a loading state while questions are being fetched.
 * Currently minimal; will be enhanced with styling and animations in the future.
 */

export default function LoadingView() {
    return (
        <View>
            <Text>Loading...</Text>
        </View>
    );
}
