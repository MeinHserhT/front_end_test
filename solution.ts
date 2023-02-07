// internal data types
type ShopingItemType = {
    title: string
    price: number
    currency: string
    date: string
}
interface INodeElement {
    firstName: string
    lastName: string
    age: number
    birthDate: string
    shoppingItemsList?: ShopingItemType[]
}
type Chat = {
    title: string
    nodesList: INodeElement[]
}
// external data types
type Timestamp = {
    seconds: number
    nanos: number
}
type ExtShopingItemType = {
    Title: string
    Price: number
    Currency: string
    Date: Timestamp
}
interface IExtNodeElement {
    FirstName: string
    LastName: string
    Age: number
    BirthDate: Timestamp
    ShoppingItems: ExtShopingItemType[]
}
type ExtChat = {
    Title: string
    ChatItems: IExtNodeElement[]
}

function convert_timestamp(str: string): Timestamp {
    let time = new Date(str).getTime(); // create a Datetime object to get the seconds
    return {
        seconds: time / 1000, 
        nanos: time % 1000 * 1000000
    };
}

function converter_shopping_item(sItem: ShopingItemType) : ExtShopingItemType{
    return {
        Title: sItem.title,
        Price: sItem.price,
        Currency: sItem.currency,
        Date: convert_timestamp(sItem.date)
    };
}

function converter_inode_elem(inodeItem: INodeElement): IExtNodeElement{
    let arr: ExtShopingItemType[] = [];
    if (typeof inodeItem.shoppingItemsList !== 'undefined') // check list not undefined
        arr = inodeItem.shoppingItemsList.map(e => converter_shopping_item(e))
    return {
        FirstName: inodeItem.firstName,
        LastName: inodeItem.lastName,
        Age: inodeItem.age,
        BirthDate: convert_timestamp(inodeItem.birthDate),
        ShoppingItems: arr,
    };
}

function converter_chat(chat: Chat): ExtChat{
    return {
        Title: chat.title,
        ChatItems: chat.nodesList.map(e => converter_inode_elem(e))
    }
}