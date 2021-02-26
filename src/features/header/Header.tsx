import React from "react";
import { Container, Header } from "@sberdevices/ui";

export function HeaderComponent() {
  return (
    <Container>
      <Header
        back={true}
        logo="./images/logo.png"
        logoAlt="Logo"
        title="Header title text"
        subtitle="Subtitle text"
        onBackClick={() => console.log("Back click!")}
      >
        <div>Header content</div>
      </Header>
    </Container>
  );
}
