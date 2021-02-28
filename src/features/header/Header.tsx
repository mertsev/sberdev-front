import React from "react";
import { Cell, CellIcon, Container, Header, TextBox } from "@sberdevices/ui";
import { Link } from "react-router-dom";

function HeaderComponentFunction(): JSX.Element {
  return (
    <Container>
      <Header
        back={true}
        logo="./logo.png"
        logoAlt="Logo"
        title="Открой завтрак"
        subtitle="Какой бы завтрак выбрать..."
        onBackClick={() => console.log("Back click!")}
        style={{ paddingTop: "30px", paddingBottom: "30px" }}
      >
        <Link to={`/user/`}>
          <Cell
            left={<CellIcon as="img" src="./sberkot_swag.png" alt="avocado" />}
            content={
              <TextBox title={"Сытый пользователь"} subTitle={"Lvl: 42"} />
            }
          />
        </Link>
      </Header>
    </Container>
  );
}

export const HeaderComponent = React.memo(HeaderComponentFunction);
