export function isAPIActionRejected(type: string):boolean {
    const splittedType = type.split('/')
    const actionName = splittedType[splittedType.length-1]
    return actionName === 'rejected'
}