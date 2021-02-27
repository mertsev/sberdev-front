import React from "react";
import { Container, Header } from "@sberdevices/ui";

export function HeaderComponent(): JSX.Element {
  return (
    <Container>
      <Header
        back={true}
        logo="./sberkot_swag.png"
        logoAlt="Logo"
        title="All your base are belong to us"
        subtitle="Повар спрашивает повара..."
        onBackClick={() => console.log("Back click!")}
      >
        <div>Утренний поварёнок</div>
      </Header>
    </Container>
  );
}
