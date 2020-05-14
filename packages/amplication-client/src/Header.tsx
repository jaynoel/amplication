import React from "react";
import { Link } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
  TopAppBarActionItem,
} from "@rmwc/top-app-bar";
import useAuthenticated from "./use-authenticated";

type TData = {
  me: {
    account: {
      firstName: string;
    };
    organization: {
      id: string;
      name: string;
    };
  };
};

type Props = {};

function Header(props: Props) {
  const authenticated = useAuthenticated();
  const { data } = useQuery<TData>(GET_USER, {
    skip: !authenticated,
  });
  return (
    <TopAppBar>
      <TopAppBarRow>
        <TopAppBarSection alignStart>
          <TopAppBarTitle>
            {data && (
              <Link to={`/organization/${data.me.organization.id}`}>
                <span>{data.me.organization.name}</span>
              </Link>
            )}
          </TopAppBarTitle>
        </TopAppBarSection>
        <TopAppBarSection alignEnd>
          <TopAppBarActionItem icon="search" />
          <TopAppBarActionItem icon="notifications" />
          {data && (
            <>
              {/* <img height={30} src={data.user.picture} /> */}
              <Link to="/account">
                <span>{data.me.account.firstName}</span>
              </Link>
            </>
          )}
        </TopAppBarSection>
      </TopAppBarRow>
    </TopAppBar>
  );
}

export default Header;

const GET_USER = gql`
  query getUser {
    me {
      account {
        firstName
      }
      organization {
        id
        name
      }
    }
  }
`;