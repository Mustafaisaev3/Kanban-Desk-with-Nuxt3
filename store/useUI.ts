import { defineStore } from 'pinia'

interface IUseUI {
    isModalOpen: boolean,
    modalView: string | null,
    modalData: any | null
}

const useUI = defineStore('UI', {
    state: () => ({
        isModalOpen: false,
        modalView: null,
        modalData: null
    } as IUseUI),

    actions: {
        openModal (madalView: string, data?: any) {
            if (data) this.modalData = data

            this.modalView = madalView
            this.isModalOpen = true
            console.log(this.modalView, madalView)
        }, 
        closeModal () {
            this.modalData = null
            this.isModalOpen = false
            console.log(this.isModalOpen)
        },
    }
})

export default useUI