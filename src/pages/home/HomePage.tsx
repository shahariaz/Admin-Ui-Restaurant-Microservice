import { Typography } from "antd";
import { useAuthStore } from "../../store";
import { useEffect, useState } from "react";
const { Title } = Typography;
export const HomePage = () => {
  const { user } = useAuthStore();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const updateGreeting = () => {
      const currentTime = new Date().getHours();
      let message = "";

      if (currentTime >= 5 && currentTime < 12) {
        message = "Good Morning!";
      } else if (currentTime >= 12 && currentTime < 18) {
        message = "Good Afternoon!";
      } else if (currentTime >= 18 && currentTime < 22) {
        message = "Good Evening!";
      } else {
        message = "Good Night!";
      }
      setGreeting(message);
    };

    updateGreeting();
  }, []);

  return (
    <div>
      <Title level={4}>
        {greeting} , {user?.firstName}😒
      </Title>
    </div>
  );
};
