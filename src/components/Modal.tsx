import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useAppStore } from '../stores/useAppStore';
import { Recipie } from '../types';

export default function Modal() {
  const modal = useAppStore((state) => state.modal)
  const closeModal = useAppStore((state) => state.closeModal)
  const selectedRecipie = useAppStore((state) => state.selectedRecipie)

  const renderIngredients = () => {
    const ingredients: JSX.Element[] = []

    for (let i = 1; i <= 6; i++) {
      const ingredient = selectedRecipie[`strIngredient${i}` as keyof Recipie]
      const measure = selectedRecipie[`strMeasure${i}` as keyof Recipie]
      if (ingredient && measure) {
        ingredients.push(
          <li key={i} className='text-lg font-normal'>
            {ingredient} - {measure} 
          </li>
        )
      }
    }

    return ingredients
  }

  return (
    <>
      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/70" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white p-4 pt-5 pb-4 text-left shadow-xl transition-all md:my-8 md:w-full md:max-w-2xl md:p-6" >
                  <Dialog.Title as="h3" className="text-gray-900 text-4xl font-extrabold my-5 text-center">
                    {selectedRecipie.strDrink}
                  </Dialog.Title>
                  <img src={selectedRecipie.strDrinkThumb}
                    alt={`Imagen de ${selectedRecipie.strDrink}`}
                    className='mx-auto w-96'
                  />
                  <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                    {renderIngredients()}
                  </Dialog.Title>
                  <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                    Instrucciones
                  </Dialog.Title>
                  <p className='text-lg'>{selectedRecipie.strInstructions}</p>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}