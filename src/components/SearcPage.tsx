import IconButton from '@/components/IconButton';
import Message, { MessageProps } from '@/components/Message';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { FormEvent, useCallback, useMemo, useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import Button from './Button';

const SearchPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [messageParams, setMessageParams] = useState<
    ChatCompletionMessageParam[]
  >(() => {
    if (typeof window === undefined) return [];
    const excistingMessages = localStorage.getItem('messages');
    if (!excistingMessages) return [];
    return JSON.parse(excistingMessages);
  });

  const { mutate, isPending } = useMutation<
    ChatCompletionMessageParam[],
    unknown,
    ChatCompletionMessageParam[]
  >({
    mutationFn: async (messages) => {
      const res = await axios.post(`/api/completions`, {
        messages,
      });

      return res.data.messages;
    },
    onSuccess: (data) => {
      setMessageParams(data);
      localStorage.setItem('messages', JSON.stringify(data));
    },
  });

  const handleReset = useCallback(() => {
    if (window.confirm('대화를 초기화 하시겠습니까?')) {
      setMessageParams([]);
      localStorage.removeItem('messages');
    }
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isPending || !inputRef.current) return;
      const nextMessages = [
        ...messageParams,
        {
          content: inputRef.current?.value ?? '',
          role: 'user' as const,
        },
      ];

      setMessageParams(nextMessages);
      mutate(nextMessages);
      inputRef.current.value = '';
    },
    [messageParams, isPending, mutate],
  );

  const messagePropList = useMemo(() => {
    return messageParams.filter((param): param is MessageProps => {
      return param.role === 'assistant' || param.role === 'user';
    });
  }, [messageParams]);

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1">
        <Message content="무엇이든 물어보세요." role="assistant" />
        {messagePropList.map((props) => (
          <Message key={props.content} {...props} />
        ))}
        {isPending && <Message content="생각중..." role="assistant" />}
      </div>
      <div className="container mx-auto p-4 pb-12">
        <form
          onSubmit={handleSubmit}
          className="flex items-center rounded-md border"
        >
          <input
            ref={inputRef}
            type="text"
            className="flex-1 rounded-md p-2 pl-3"
            placeholder="NextJS가 뭐야?"
          />
          <button type="submit" className="p-2"></button>
          <IconButton Icon={AiOutlineSearch} type="submit" />
        </form>
        <Button className="ml-auto mt-2 block w-[100px]" onClick={handleReset}>
          대화 초기화
        </Button>
      </div>
    </div>
  );
};

export default SearchPage;
