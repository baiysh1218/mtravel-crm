import { Passenger } from "@/entities/application/module";
import { FlightAppealTicket } from "@/entities/flight/model/flightTicket.ts";
import { TYPE_AGE } from "@/shared/constants";

export interface TransactionItem {
  title: string;
  fieldValue: {
    value: string;
  };
}

export const getPassengersPriceOfTicket = (
  appealFlight?: FlightAppealTicket,
) => {
  const ticketAppeal = appealFlight?.flight_details;

  const listPassengersPrice =
    ticketAppeal?.agent_mode_prices?.passengers_amounts_details;
  const passengers = ticketAppeal?.tickets?.[0]?.passengers;

  const transactionByPassenger: TransactionItem[] | undefined = passengers?.map(
    (item, index) => ({
      title: `${item?.name?.last || ""} ${item?.name?.first || ""} ${item?.name?.middle || ""}`,
      fieldValue: {
        value: String(
          listPassengersPrice?.[index]
            .service_amount_for_non_active_agent_mode || 0,
        ),
      },
    }),
  );

  return transactionByPassenger;
};

export const getPassengersInfo = (passengers?: Passenger[]) => {
  const countAdults =
    passengers?.filter((passenger) => passenger.age === TYPE_AGE.ADULT)
      ?.length || 0;
  const countChildren =
    passengers?.filter((passenger) => passenger.age === TYPE_AGE.CHILD)
      ?.length || 0;
  const countInfants =
    passengers?.filter((passenger) => passenger.age === TYPE_AGE.INFANT)
      ?.length || 0;
  const allCountPassengers = countAdults + countChildren + countInfants;

  return {
    [TYPE_AGE.ADULT]: countAdults,
    [TYPE_AGE.CHILD]: countChildren,
    [TYPE_AGE.INFANT]: countInfants,
    totalCount: allCountPassengers,
  };
};
