// Fonction qui va filtrer les options du menu de sélection
export function dropdownFilter(inputKeywords, list) {
    let result = [];
    if(inputKeywords.length === 0){
        return list;
    }
    list.map((item) => {
        let count = 0;
        const array = Object.values(item).toString();
        inputKeywords.map((word) => {
            if (array.toLowerCase().trim().includes(word.toLowerCase().trim())) {
                count++;
            }
            if (count === inputKeywords.length) {
                result.push(item);
            }
        })
    })
    return result;
}