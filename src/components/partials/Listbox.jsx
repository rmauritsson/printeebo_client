import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

const people = [
  { name: "Wade Cooper" },
  { name: "Arlene Mccoy" },
  { name: "Devon Webb" },
  { name: "Tom Cook" },
  { name: "Tanya Fox" },
  { name: "Hellen Schmidt" },
];

const ListboxLayout = ({ content }) => {
  const [selected, setSelected] = useState(people[0]);

  return (
    <>
      <p>Listbox</p>
    </>
  );
};

export default ListboxLayout;
