import { memo, useCallback, useMemo } from "react";

interface CompProps {
    onClick: () => any,
    value: any,
}

const Child = memo(function({onClick, value}:CompProps) {
    return (
        <></>
    )
})

export function Comp(props: CompProps) {
    const onClick = useCallback(() => {},[])
    const value = useMemo(() => ({
        num: '123'
    }),[])

    return (
        <div>
            <Child value={value} onClick={onClick}/>
        </div>
    );
};