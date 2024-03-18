import { nanoid } from "nanoid";

import { useFocusedNodeIndex } from "./useFocusedNodeIndex";
import { Cover } from "./Cover";
import { Spacer } from "./Spacer";
import { NodeContainer } from "../Node/NodeContainer";
import { Title } from "./Title";
import { useAppState } from "../state/AppStateContext";

import { DndContext, DragOverlay, DragEndEvent } from "@dnd-kit/core";
import {
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { supabase } from "../supabaseClient";
import { Button } from "@mantine/core";

export const Page = () => {
	const {
		title,
		nodes,
		addNode,
		cover,
		setCoverImage,
		reorderNodes,
		setTitle,
	} = useAppState();

	const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({
		nodes,
	});

	const handleDragEvent = (event: DragEndEvent) => {
		const { active, over } = event;
		if (over?.id && active.id !== over?.id) {
			reorderNodes(active.id as string, over.id as string);
		}
	};

	async function signOut() {
		const { error } = await supabase.auth.signOut();
		console.log(error);
	}

	return (
		<>
			<Button
				style={{ position: "absolute", top: "2rem", left: "2rem", zIndex: 1 }}
				type="button"
				onClick={signOut}
			>
				Sign Out
			</Button>
			<Cover filePath={cover} changePageCover={setCoverImage} />
			<div>
				<Title addNode={addNode} title={title} changePageTitle={setTitle} />
				<DndContext onDragEnd={handleDragEvent}>
					<SortableContext items={nodes} strategy={verticalListSortingStrategy}>
						{nodes.map((node, index) => (
							<NodeContainer
								key={node.id}
								node={node}
								isFocused={focusedNodeIndex === index}
								updateFocusedIndex={setFocusedNodeIndex}
								index={index}
							/>
						))}
					</SortableContext>
					<DragOverlay />
				</DndContext>
				<Spacer
					handleClick={() => {
						addNode({ type: "text", value: "", id: nanoid() }, nodes.length);
					}}
					showHint={!nodes.length}
				/>
			</div>
		</>
	);
};
