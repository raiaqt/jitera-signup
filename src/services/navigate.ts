import { useNavigate } from 'react-router-dom';

export const useNavigateService = () => {
  const navigateService = useNavigate();

  const qs = (params: any) => '?' + new URLSearchParams(params || {}).toString();

  return {
    navigate: (url: string, params?: Record<string, string | number | undefined>) => {
      if (navigateService) {
        navigateService(`${url}${qs(params)}`);
      } else {
        window.open(`${url}${qs(params)}`, '_self');
      }
    },
    replace: (url: string, params?: Record<string, string | number | undefined>) => {
      if (navigateService) {
        navigateService(`${url}${qs(params)}`, {
          replace: true,
        });
      } else {
        window.open(`${url}${qs(params)}`, '_self');
      }
    },
    goBack: () => {
      if (navigateService) {
        navigateService(-1);
      } else {
        window.history.back();
      }
    },
    reload: () => {
      if (navigateService) {
        navigateService(0);
      } else {
        window.location.reload();
      }
    },
    openExternalLink: (
      url: string,
      isNewTab?: boolean,
      params?: Record<string, string | number | undefined>,
    ) => {
      if (isNewTab) {
        window.open(`${url}${qs(params)}`, '_blank');
      } else {
        window.open(`${url}${qs(params)}`, '_self');
      }
    },
  };
};
