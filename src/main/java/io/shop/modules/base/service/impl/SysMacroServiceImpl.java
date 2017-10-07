package io.shop.modules.base.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import io.shop.modules.base.dao.SysMacroDao;
import io.shop.modules.base.entity.SysMacroEntity;
import io.shop.modules.base.service.SysMacroService;



@Service("sysMacroService")
public class SysMacroServiceImpl implements SysMacroService {
	@Autowired
	private SysMacroDao sysMacroDao;
	
	@Override
	public SysMacroEntity queryObject(Long macroId){
		return sysMacroDao.queryObject(macroId);
	}
	
	@Override
	public List<SysMacroEntity> queryList(Map<String, Object> map){
		return sysMacroDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return sysMacroDao.queryTotal(map);
	}
	
	@Override
	public void save(SysMacroEntity sysMacro){
		sysMacroDao.save(sysMacro);
	}
	
	@Override
	public void update(SysMacroEntity sysMacro){
		sysMacroDao.update(sysMacro);
	}
	
	@Override
	public void delete(Long macroId){
		sysMacroDao.delete(macroId);
	}
	
	@Override
	public void deleteBatch(Long[] macroIds){
		sysMacroDao.deleteBatch(macroIds);
	}
	
}
