import { ExchangeAppeal } from "@/entities/application/module/edit-appeal.ts";
import { Passenger } from "@/entities/flight/model/flightTicket.ts";

interface ResultPrepare {
  [x: string]: string;
}

interface AppealsData {
  passengersAppeal?: ExchangeAppeal;
  passengersTicket?: Passenger[];
  topic?: string;
}

export const prepareDataRenderForm = ({
  passengersAppeal,
  passengersTicket,
  topic,
}: AppealsData) => {
  const transformedObject: ResultPrepare | undefined = passengersTicket?.reduce(
    (acc, person) => {
      // @ts-ignore
      acc[person.key] =
        `${person.name.last} ${person.name.first} ${person.name.middle}`;

      return acc;
    },
    {},
  );

  return passengersAppeal?.passengers?.map((item) => {
    const result =
      transformedObject?.[item.passenger_key as keyof ResultPrepare];
    if (result) {
      return {
        fullName: result,
        serviceName: topic,
        status: item.status,
        key: item.passenger_key,
        price: item.price_of_service,
      };
    }
  });
};
