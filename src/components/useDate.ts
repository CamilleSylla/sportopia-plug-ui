export function useDate () {

    const litteralDate = (date : Date) => {
        const options = {weekday: "long", year: "numeric", month: "long", day: "numeric"}
        return new Intl.DateTimeFormat('fr-FR', options).format(date);
    }
    return {
        litteralDate
    }
}