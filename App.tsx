import { ConvexProvider, ConvexReactClient } from "convex/react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";

import TodoScreen from "./screens/TodoScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import { Id } from "./convex/_generated/dataModel";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Todo: { userId: Id<"users"> };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [userId, setUserId] = useState<Id<"users"> | null>(null);

  return (
    <ConvexProvider client={convex}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {userId ? (
            <Stack.Screen name="Todo">
              {() => <TodoScreen userId={userId} />}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen name="Login">
                {() => <LoginScreen onLogin={(id: Id<"users">) => setUserId(id)} />}
              </Stack.Screen>
              <Stack.Screen name="Signup" component={SignupScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ConvexProvider>
  );
}
