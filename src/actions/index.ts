import { doc } from 'definitions'
import { AppStore } from 'store'
import createActions from 'utils/createActions'
import moment from 'utils/moment'


export interface getDocInput {
    page_number: number
    page_size: number
    title?: string
    id?: number
    dt_create_start?: string
    dt_create_end?: string
    sort_by?: 'dt_create' | 'id'
    sort_type: 'asc' | 'desc'
}

const docs: doc[] = '.'.repeat(1000).split('.').map((d, i) => {
    const dt = moment().add(i, 'days')
    return {
        id: i+1,
        dt_create: dt.format('L'),
        title: `Документ #${i+1} от ${dt.format('l')}`,
        body: Math.random() + ''
    }
})

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))


export default createActions({
    getDocs: async (data: getDocInput) => {
        if (data.id) {
            AppStore.setLoading(true)
            await sleep(1000)
            const res = docs.filter((d) => d.id == data.id)
            AppStore.setDocs({fullCount: res.length, data: res})
        }
        else {
            AppStore.setLoading(true)
            await sleep(1000)
            let res = docs.filter((d) => {
                const startDate = moment(data.dt_create_start, 'YYYY-MM-DD')
                const endDate = moment(data.dt_create_end, 'YYYY-MM-DD')
                const crDate = moment(d.dt_create, 'DD.MM.YYYY')
                const lastDocDate = moment(docs[docs.length - 1].dt_create, 'DD.MM.YYYY')
                const firstDocDate = moment(docs[0].dt_create, 'DD.MM.YYYY')

                if (data.dt_create_start && data.dt_create_end && !crDate.isBetween(startDate, endDate, undefined, '[]')) return false

                else if (data.dt_create_start && !crDate.isBetween(startDate, lastDocDate, undefined, '[]')) return false

                else if (data.dt_create_end && !crDate.isBetween(firstDocDate, endDate, undefined, '[]')) return false
                
                
                if (data.title) {
                    if (!d.title.toUpperCase().includes(data.title.toUpperCase())) return false
                } 

                return true
            })

            if (data.sort_by) {
                if (data.sort_by == 'dt_create') {
                    res = res.sort((a, b) => {
                        const aDate = moment(a.dt_create)
                        const bDate = moment(b.dt_create)

                        let comp = 0
                        if (bDate.isBefore(aDate)) comp = 1
                        else if (aDate.isBefore(bDate)) comp = -1
                        return data.sort_type == 'desc' ? comp * -1 : comp 
                    })
                }
                else if (data.sort_by == 'id') {
                    res = res.sort((a, b) => {
                        let comp = 0
                        if (a.id > b.id) comp = 1
                        else if (a.id < b.id) comp = -1
                        return data.sort_type == 'desc' ? comp * -1 : comp 
                    })
                }
            }
            AppStore.setDocs({
                fullCount: res.length,
                data: res.slice((data.page_number - 1) * data.page_size, data.page_number * data.page_size)
            })
        }
    }
})